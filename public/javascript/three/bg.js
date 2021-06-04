
import * as THREE from './three.module.js';
import { EffectComposer } from '../three/EffectComposer.js'
import { RenderPass } from '../three/RenderPass.js';
import { UnrealBloomPass } from '../three//UnrealBloomPass.js';

// canvas selector --------------------------------
  let canvas =  document.querySelector('#bg')
// scene --------------------------------
  const scene = new THREE.Scene();
// camera --------------------------------
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const cameraStartY = 1
  camera.position.z = 4
  camera.position.y = cameraStartY
  camera.rotation.x = 0.25
// renderer --------------------------------
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
// post processing composer --------------------------------
  const composer = new EffectComposer( renderer );
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowAspect = windowWidth / windowHeight
  const resolutionDef = 360 // define defalt height resolution. used to downscale
  composer.setSize( resolutionDef * windowAspect , resolutionDef )

// lights --------------------------------
  const ambientLight = new THREE.AmbientLight( 0x404040, 0.1 ); // soft white light
  const pointLight = new THREE.PointLight( 0xffffff, 3, 20 );
  pointLight.position.set( 0, 2.5, -1 )
  scene.add( ambientLight );
  scene.add( pointLight );

// materials --------------------------------
  const lineMaterial = new THREE.LineBasicMaterial( {	color: 0xffffff } );
  const foorMaterial = new THREE.MeshStandardMaterial( { color: 0x201a9 } );
  const mountainTopMaterial = new THREE.LineBasicMaterial( {	color: 0xa83477 } );
  const mountainMaterial = new THREE.MeshStandardMaterial( { color: 0x1e004c } );

// define geometry --------------------------------
    // geometry of cylinders
  const loopSegments = 30 // segments around
  const originRad = 5
  let loopRad = originRad // radius of circle
  const loopXLength = 2 * Math.PI * loopRad * ( (360/30) / 360 )  // width of each segment will be equal to the arc length of the rad segment
  const widthSegmentsFromCenter = 24 // segments wide for the cyl
  let radAdjustPerLoop = 0.999 // multiplier for much each loop radius reduces each iteration

  let cyl = new THREE.Group()  // empty array for cylinder 

  let len = {} // empty obj to hold the line points
    // define circle lines
  for( var i = 0; i < widthSegmentsFromCenter; i++) {
    loopRad = loopRad * radAdjustPerLoop // how much to adjuse the diameter of the rings by each iteration
    radAdjustPerLoop -= 0.01 // change the multiplier
    const loop = [] // empty point array
    function defineLoop( seg, rad ){  // loop the points of a single circle
      for( var x = 0; x < seg + 1; x++){
          // define vert
        const vert = new THREE.Vector3( loopXLength * i, rad * Math.cos( ( Math.PI * 2 ) / seg * x ), rad * Math.sin( ( Math.PI * 2 ) / seg * x ) )
          // define points for the length lines while loop
        loop.push( vert ) 
        if( len[`${x}`] === undefined ){ 
          len[`${x}`] = {}
          len[`${x}`][`${i}`] = vert
        } else {
          len[`${x}`][`${i}`] = vert
        }
      }
    }
      // execute
    defineLoop( loopSegments, loopRad )
      // create loop lines
    const loopLineGeometry = new THREE.BufferGeometry().setFromPoints( loop );
    const loopLine = new THREE.Line( loopLineGeometry, lineMaterial );
      // add loop lines to group
    cyl.add( loopLine )
  }

    // define length lines
  for( var i = 0; i < loopSegments; i++ ){
    let line = []
    for( var x = 0; x < widthSegmentsFromCenter; x++){
      line.push( len[`${i}`][`${x}`])
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints( line );
    const lineOut = new THREE.Line( lineGeometry, lineMaterial );
    cyl.add( lineOut )
  }
    // clone and mirror cylinder
  const mirror = cyl.clone()
  mirror.scale.x = -1
    // create floor and add to group
  let floorCyl = new THREE.Group()
  floorCyl.add(cyl)
  floorCyl.add(mirror)
    // create sky group and add clones
  let skyCyl = new THREE.Group()
  const cloneSky = cyl.clone()
  const mirrorSky = cloneSky.clone()
  mirrorSky.scale.x = -1
  skyCyl.add(cloneSky)
  skyCyl.add(mirrorSky)
    // resize elements
  floorCyl.scale.y = 0.1
  skyCyl.scale.x = 2
  skyCyl.scale.z = 4
  skyCyl.position.z = 2

    //mountains
  let mountainGroup = new THREE.Group()
  const mountainGeometry = new THREE.PlaneBufferGeometry( 5, ( widthSegmentsFromCenter * 2 ) + 1, 1, ( widthSegmentsFromCenter * 2 ) + 1 )
  var positionAttribute = mountainGeometry.attributes.position;
  const mountainTop = []
  for ( var i = 0; i < positionAttribute.count; i ++ ) {
    var x = positionAttribute.getX( i );
    var y = positionAttribute.getY( i );
    var z = positionAttribute.getZ( i );
    var newX =  x + Math.random() * 2
    // x += Math.random() * 2;
    if( x === 2.5){
      mountainTop.push( new THREE.Vector3(newX, y, z))
    }
    positionAttribute.setXYZ( i, newX, y, z );
  }
    // mount top line
  const mountainTopGeometry = new THREE.BufferGeometry().setFromPoints( mountainTop );
  const mountainTopOut = new THREE.Line( mountainTopGeometry, mountainTopMaterial );
  mountainTopOut.rotation.z = Math.PI / 2
  mountainTopOut.rotation.x = -1
  mountainTopOut.position.z = -1.95
  mountainGroup.add( mountainTopOut )
    // mountain model
  const mountains = new THREE.Mesh( mountainGeometry, mountainMaterial )
  mountains.rotation.z = Math.PI / 2
  mountains.rotation.x = -1
  mountains.position.z = -2
  mountainGroup.add( mountains )

  // floor under the grid
  const floorPlane = new THREE.SphereGeometry( originRad, 20, 20 )
  const floor = new THREE.Mesh( floorPlane, foorMaterial );
  floor.scale.y = 0.09
  floor.scale.x = 2.25

// add to scene --------------------------------
  scene.add( floorCyl )
  scene.add( skyCyl )
  scene.add( floor );
  scene.add( mountainGroup )

// render composer --------------------------------
  const renderScene = new RenderPass( scene, camera );
  const bloomPass = new UnrealBloomPass( new THREE.Vector2(  window.innerWidth , window.innerHeight ), 1.65, 0.3, 0.0 );
  composer.addPass( renderScene );
  composer.addPass( bloomPass  );

// functions --------------------------------
    // mouse move watcher
  function handleMouseMove(event) {
    var eventDoc, doc, body;
    const w = document.body.getBoundingClientRect()
    event = event || window.event;

    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        event.pageY = event.clientY +
          (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
          (doc && doc.clientTop  || body && body.clientTop  || 0 );
    }
    const newWidthPos = ( event.clientX / window.innerWidth ) - 0.5
    const newHeightPos = ( event.clientY / window.innerHeight ) - 0.5
    camera.position.x = newWidthPos
    camera.position.y = cameraStartY + ( -newHeightPos / 3 )
  }

    // animate over time
  let then = 0;
  function animate(now) {
    now *= 0.001; 
    const delta = now - then;
    then = now;
    const speed = 1
    cyl.rotation.x += ( delta * speed )
    mirror.rotation.x += ( delta * speed )
    cloneSky.rotation.x += ( delta * ( speed / 2 ) )
    mirrorSky.rotation.x +=( delta * ( speed / 2 ) )
    requestAnimationFrame(animate);
    composer.render(scene, camera);
  }

    //resize
  function resize(){
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowAspect = windowWidth / windowHeight
    camera.aspect = windowAspect;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize( resolutionDef * windowAspect , resolutionDef )
  };


// execute and listeners --------------------------------
requestAnimationFrame(animate);
  
document.onmousemove = handleMouseMove
window.addEventListener( 'resize', resize, false);

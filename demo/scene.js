import {IoCoreMixin} from "../lib/io.js";
import "../src/three-ui.js";

import * as THREE from "../../three.js/build/three.module.js";
import {GLTFLoader} from "../lib/GLTFLoader.js";

var loader = new GLTFLoader();

export class ThreeDemoScene extends IoCoreMixin(THREE.Scene) {
  static get properties() {
    return {
      path: String,
      loading: Boolean
    }
  }
  pathChanged() {
    this.loading = true;
    loader.load( 'demo/scene/cubes.gltf', gltf => {
      gltf.scene.children.forEach(child => { this.add( child ); });
      this.add(new THREE.AmbientLight());
      this.dispatchEvent('object-mutated', {object: this}, false, window);
      this.loading = false;
    }, undefined, function ( e ) {
      console.error( e );
    } );
  }
}

ThreeDemoScene.Register = IoCoreMixin.Register;
ThreeDemoScene.Register();
import chai = require('chai');
import mocha = require('mocha');
import {Pt} from '../Pt';
import {Util} from '../Util';
import {Num, Geom} from '../Op';

var {assert} = chai;
var {describe, it} = mocha;


describe('Op: ', function() {

  describe('Num: ', function() {
    
    it('can calculate linear interpolation', function() {
      assert.isTrue( Math.abs(Num.lerp(1, 3, 0.2)-1.4) < 0.0001 );
    });

    it('can bound a value', function() {
      assert.equal( Num.boundValue(105, 11, 100), 16 );
    });

    it('can bound angle', function() {
      assert.equal( Num.boundValue(105, 11, 100), 16 );
    });

    it('can check if a value is within a range set by two values', function() {
      assert.isTrue( Num.within( -3.001, 1, -3.001 ) && !Num.within( 3.1, -100, 3.099 ) );
    });

    it('can normalize a value', function() {
      assert.equal( Num.normalizeValue( 15, 10, 110), 0.05 );
    });
    
    it('can map value to a new range', function() {
      assert.equal( Num.mapToRange( 0.32, 1, 0, 0, 100), 32 );
    });
  });

  describe('Geom: ', function() {
    

    it('can bound angle', function() {
      assert.equal( Geom.boundAngle(-12), 348 );
    });

    it('can bound radian', function() {
      assert.equal( Geom.boundRadian(-Math.PI), Math.PI );
    });

  });
});

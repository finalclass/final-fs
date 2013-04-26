/*jshint node:true*/
/*global describe, it, beforeEach, afterEach, expect, jasmine, waitsFor, runs*/

'use strict';

var ffs = require('../index.js'),
    fs = require('fs');


describe('ffs', function () {

    var dir = __dirname + '/var';

    beforeEach(function () {
        ffs.rmdirRecursiveSync(dir);

        fs.mkdirSync(dir);
        fs.mkdirSync(dir + '/test1');
        fs.mkdirSync(dir + '/test2');
        fs.writeFileSync(dir + '/test1/ttt.txt', 'TEST');
        fs.writeFileSync(dir + '/test1/ttt2.txt', 'TEST2');
        fs.writeFileSync(dir + '/test2/ttt3.txt', 'abc');
        fs.writeFileSync(dir + '/test2/ttt4.txt', 'abc2');
    });

    afterEach(function () {

    });

    it('readdir', function () {
        var done = false,
            files;

        ffs.readdir(dir).then(function (result) {
            done = true;
            files = result;
        });

        waitsFor(function () {
            return done;
        }, 'readdir', 100);

        runs(function () {
            expect(files.indexOf('test1')).not.toBe(-1);
            expect(files.indexOf('test2')).not.toBe(-1);
        });
    });

    it('unlink', function () {
        var done = false;

        ffs.unlink(dir + '/test1/ttt.txt').then(function () {
            done = true;
        });

        waitsFor(function () {
            return done;
        }, 'unlink', 100);

        runs(function () {
            expect(fs.existsSync(dir + '/test1/ttt.txt')).toBeFalsy();
        });
    });

    it('rmdirRecursive', function () {
        var done = false;

        ffs.rmdirRecursive(dir).then(function () {
            done = true;
        }, function (err) {
            console.log(err);
            console.log(err.stack);
            console.log('WRONG!');
        });

        waitsFor(function () {
            return done;
        }, 'recursiveRmDir', 100);

        runs(function () {
            expect(fs.existsSync(dir)).toBeFalsy();
        });
    });

    it('dirInfo', function () {
        var dirInfo;

        ffs.dirInfo(__dirname + '/var').then(function (result) {
            dirInfo = result;
        });

        waitsFor(function () {
            return dirInfo !== undefined;
        }, 'dirInfo', 100);

        runs(function () {
            expect(dirInfo.length).toBe(2);
            expect(dirInfo[0].filePath).toBeDefined();
            expect(dirInfo[0].fileName).toBeDefined();
            expect(dirInfo[1].filePath).toBeDefined();
            expect(dirInfo[1].fileName).toBeDefined();
            expect(function () {
                dirInfo[0].isDirectory();
            }).not.toThrow();
            expect(dirInfo[1].isDirectory()).toBeTruthy();
        });
    });

    it('dirFiles', function () {
        var dir1 = __dirname + '/var',
            dir2 = __dirname + '/var/test1',
            dir1Files,
            dir2Files;

        ffs.dirFiles(dir1).then(function (files) {
            dir1Files = files;
        });

        ffs.dirFiles(dir2).then(function (files) {
            dir2Files = files;
        });

        waitsFor(function () {
            return dir1Files !== undefined && dir2Files !== undefined;
        }, 'dirFiles', 100);

        runs(function () {
            expect(dir1Files.length).toBe(0);
            expect(dir2Files.length).toBe(2);
            expect(dir2Files.indexOf('ttt.txt')).not.toBe(-1);
            expect(dir2Files.indexOf('ttt2.txt')).not.toBe(-1);
        });
    });

});

# Final-FS

Final-FS is a wrapper for nodejs fs module.
It uses [when](https://github.com/cujojs/when) library for async calls.

## rmdirRecursive

    var ffs = require('final-fs');

    ffs.rmdirRecursive(dir).then(function () {
        //content and directory 'dir' is removed now
    }).otherwise(function (err) {
        //something went wrong
    });

## readdir

    var ffs = require('final-fs');

    ffs.readdir(dir).then(function (files) {
        // do something with the files
    }).otherwise(function (err) {
        //Do something with the error
    });;

## unlink

    var ffs = require('final-fs');
    
    ffs.unlink(path).then(function () {
        //file is unlinked now
    }).otherwise(function (err) {
        //something wen wrong
    });;


/*jslint node:true*/
'use strict';

var fs = require('fs'),
    when = require('when'),
    path = require('path'),
    nfs = require('node-fs'),
    nodefn = require("when/node/function"),
    ffs = exports;

/**
 * Creates a promise-returning function from a Node.js-style function
 *
 * @param func
 * @returns {Function}
 */
ffs.promisify = function (func) {
    return function () {
        var defer = when.defer();

        Array.prototype.push.call(arguments, function (err) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(arguments[1]);
            }
        });

        func.apply(undefined, arguments);

        return defer.promise;
    };
};


// -----------------------------------------
// fs module
// -----------------------------------------

/**
 * @type {function (string, string) : Promise}
 */
ffs.rename = nodefn.lift(fs.rename);

/**
 * @type {function (string, string) : void}
 */
ffs.renameSync = fs.renameSync;

/**
 * @type {function (number, number) : Promise}
 */
ffs.ftruncate = nodefn.lift(fs.ftruncate);

/**
 * @tyep {function (number, number) : void }
 */
ffs.ftruncateSync = fs.ftruncateSync;

/**
 * @type {function (string, number) : Promise}
 */
ffs.truncate = nodefn.lift(fs.truncate);

/**
 * @type {function (string, number) : void}
 */
ffs.truncateSync = fs.truncateSync;

/**
 * @type {function (string, number, number) : Promise}
 */
ffs.chown = nodefn.lift(fs.chown);

/**
 * @type {function (string, number, number) : void }
 */
ffs.chownSync = fs.chownSync;

/**
 * @type {function (number, number, number) : Promise}
 */
ffs.fchown = nodefn.lift(fs.fchown);

/**
 * @type {function (number, number, number) : void}
 */
ffs.fchownSync = fs.fchownSync;

/**
 * @type {function (string, number, number) : Promise}
 */
ffs.lchown = nodefn.lift(fs.lchown);

/**
 * @type {function (string, number, number) : void}
 */
ffs.lchownSync = fs.lchownSync;

/**
 * @type {function (string, number) : Promise}
 */
ffs.chmod = nodefn.lift(fs.chmod);

/**
 * @type {function (string, number) : Promise}
 */
ffs.chmodSync = fs.chmodSync;

/**
 * @type {function (number, number) : Promise}
 */
ffs.fchmod = nodefn.lift(fs.fchmod);

/**
 * @type {function (number, number) : void}
 */
ffs.fchmodSync = fs.fchmodSync;

/**
 * @type {function (string, number) : Promise}
 */
ffs.lchmod = nodefn.lift(fs.lchmod);

/**
 * @type {function (string, number) : void}
 */
ffs.lchmodSync = fs.lchmodSync;

/**
 * @type {function (string) : Promise}
 */
ffs.stat = nodefn.lift(fs.stat);

/**
 * @type {function (string) : Promise}
 */
ffs.lstat = nodefn.lift(fs.lstat);

/**
 * @type {function (string) : Promise}
 */
ffs.fstat = nodefn.lift(fs.fstat);

/**
 * @type {function (string) : fs.Stats}
 */
ffs.statSync = fs.statSync;

/**
 * @type {function (string) : fs.Stats}
 */
ffs.lstatSync = fs.lstatSync;

/**
 * @type {function (string) : fs.Stats}
 */
ffs.fstatSync = fs.fstatSync;

/**
 * @type {function (string, string) : Promise}
 */
ffs.link = nodefn.lift(fs.link);

/**
 * @type {function (string, string) : void}
 */
ffs.linkSync = fs.linkSync;

/**
 * @type {function (string, string, ?'dir'|'file'|'junction'='file') : Promise}
 */
ffs.symlink = nodefn.lift(fs.symlink);

/**
 * @type {function (string, string, ?'dir'|'file'|'junction'='file') : void}
 */
ffs.symlinkSync = fs.symlinkSync;

/**
 * @type {function (string) : Promise}
 */
ffs.readlink = nodefn.lift(fs.readlink);

/**
 * @type {function (string) : string}
 */
ffs.readlinkSync = fs.readlinkSync;

/**
 * @type {function (string, ?object=) : Promise}
 */
ffs.realpath = nodefn.lift(fs.realpath);

/**
 * @type {function (string, ?object=) : string}
 */
ffs.realpathSync = fs.realpathSync;

/**
 * @type {function (string) : Promise}
 */
ffs.unlink = nodefn.lift(fs.unlink);

/**
 * @type {function (string) : void}
 */
ffs.unlinkSync = fs.unlinkSync;

/**
 * @type {function (string) : Promise}
 */
ffs.rmdir = nodefn.lift(fs.rmdir);

/**
 * @type {function (string) : void}
 */
ffs.rmdirSync = fs.rmdirSync;

/**
 * @type {function (string, ?number=0777) : Promise}
 */
ffs.mkdir = nodefn.lift(fs.mkdir);

/**
 * @type {function (string, ?number=0777) : void}
 */
ffs.mkdirSync = fs.mkdirSync;

/**
 * @type {function (string) : Promise}
 */
ffs.readdir = nodefn.lift(fs.readdir);

/**
 * @type {function (string) : string[]}
 */
ffs.readdirSync = fs.readdirSync;

/**
 * @type {function (number) : Promise}
 */
ffs.close = nodefn.lift(fs.close);

/**
 * @type {function (number) : void}
 */
ffs.closeSync = fs.closeSync;

/**
 * @type {function (string, string, ?number=0666) : Promise}
 */
ffs.open = nodefn.lift(fs.open);

/**
 * @type {function (string, string, ?number=0666) : void}
 */
ffs.openSync = fs.openSync;

/**
 * @type {function (string, number, number) : Promise}
 */
ffs.utimes = nodefn.lift(fs.utimes);

/**
 * @type {function (string, number, number) : void}
 */
ffs.utimesSync = fs.utimesSync;

/**
 * @type {function (number, number, number) : Promise}
 */
ffs.futimes = nodefn.lift(fs.futimes);

/**
 * @type {function (number, number, number) : void}
 */
ffs.futimesSync = fs.futimesSync;

/**
 * @type {function (number) : Promise}
 */
ffs.fsync = nodefn.lift(fs.fsync);

/**
 * @type {function (number) : void}
 */
ffs.fsyncSync = fs.fsyncSync;

/**
 * @type {function (number, Buffer, number, number, nbumber) : Promise}
 */
ffs.write = nodefn.lift(fs.write);

/**
 * @type {function (number, Buffer, number, number, nbumber) : number}
 */
ffs.writeSync = fs.writeSync;

/**
 * @type {function (number, Buffer, number, number, number) : Promise}
 */
ffs.read = nodefn.lift(fs.read);

/**
 * @type {function (number, Buffer, number, number, number) : number}
 */
ffs.readSync = fs.readSync;

/**
 * @type {function (string, ?{?encoding:string=null, ?flag:string=r}=) : Promise}
 */
ffs.readFile = nodefn.lift(fs.readFile);

/**
 * @type {function (string, ?{?encoding:string, ?flag:string}=) : Buffer|string}
 */
ffs.readFileSync = fs.readFileSync;

/**
 * @type {function (string, string|Buffer, ?{?encoding:string, ?mode:number, ?flag:string}=) : Promise}
 */
ffs.writeFile = nodefn.lift(fs.writeFile);

/**
 * @type {function (string, string|Buffer, ?{?encoding:string, ?mode:number, ?flag:string}=) : void}
 */
ffs.writeFileSync = fs.writeFileSync;

/**
 * @type {function (string, string|Buffer, ?{?encoding:string, ?mode:number, ?flag:string}=) : Promise}
 */
ffs.appendFile = nodefn.lift(fs.appendFile);

/**
 * @type {function (string, string|Buffer, ?{?encoding:string, ?mode:number, ?flag:string}=) : void}
 */
ffs.appendFileSync = fs.appendFileSync;

/**
 * @type {function (string, ?{persistent:boolean, interval:number}=, ?function(fs.Stats, fs.Stats)=) : void}
 */
ffs.watchFile = fs.watchFile;

/**
 * @type {function (string, function(fs.Stats, fs.Stats)) : void}
 */
ffs.unwatchFile = fs.unwatchFile;

/**
 * @type {function (string, ?{persistent:boolean, interval:number}=, ?function (string, string)) : fs.FSWatcher}
 */
ffs.watch = fs.watch;

/**
 * @type {function (string) : Promise}
 */
ffs.exists = nodefn.lift(fs.exists);

/**
 * @type {function (string) : boolean}
 */
ffs.existsSync = fs.existsSync;

/**
 * @type {function (string, ?{flags:'r', encoding: null, fd: null, mode: 0666, bufferSize: 66020, autoClose: true}) : ReadStream}
 */
ffs.createReadStream = fs.createReadStream;

/**
 * @type {function (string, ?{flags: 'w', encoding: null, mode: 0666}=) : WriteStream}
 */
ffs.createWriteStream = fs.createWriteStream;

// -----------------------------------------
// node-fs module
// -----------------------------------------

ffs.mkdirRecursive = function (dirPath, mode) {
    var defer = when.defer();

    nfs.mkdir(dirPath, mode, true, function (err) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve();
        }
    });

    return defer.promise;
};

ffs.mkdirRecursiveSync = function (dirPath, mode) {
    return nfs.mkdirSync(dirPath, mode, true);
};

// -----------------------------------------
// final-fs functions
// -----------------------------------------

/**
 * Recusrise remove all directory contents
 *
 * @param {string} dirPath
 */
ffs.rmdirRecursiveSync = function(dirPath) {
    var files;

    try {
        files = fs.readdirSync(dirPath);
    }
    catch(e) {
        return;
    }
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (ffs.statSync(filePath).isFile()) {
                ffs.unlinkSync(filePath);
            } else {
                ffs.rmdirRecursiveSync(filePath);
            }
        }
    }
    ffs.rmdirSync(dirPath);
};

/**
 * Removes directory with its contents. Async style.
 *
 * @param {string} dirPath
 * @returns {Promise}
 */
ffs.rmdirRecursive = function (dirPath) {
    return ffs.readdir(dirPath).then(function (files) {
        return when.map(files,
            function removeOrProceed(file) {
                var filePath = path.resolve(dirPath, file);

                return ffs.stat(filePath).then(function (stat) {
                    if (stat.isFile()) {
                        return ffs.unlink(filePath);
                    } else if (stat.isDirectory()) {
                        return ffs.rmdirRecursive(filePath);
                    } else {
                        throw new Error('Wrong file type ' + filePath);
                    }
                });
            })
            .then(function () {
                return ffs.rmdir(dirPath); //remove self
            });
    });
};

/**
 * Convert obj into json string and write it to the file in the filePath
 *
 * @param {string} filePath
 * @param {Object} obj
 * @returns {Promise}
 */
ffs.writeJSON = function (filePath, obj) {
    return ffs.writeFile(filePath, JSON.stringify(obj, null, '    '), {encoding: 'utf-8'});
};

/**
 * Read file content and turn it into js object
 *
 * @param {string} filePath
 * @returns {Promise}
 */
ffs.readJSON = function (filePath) {
    return ffs.readFile(filePath, {encoding: 'utf-8'}).then(function (result) {
        return JSON.parse(result);
    });
};

/**
 * Returns an array of fs.Stat objects with additional filePath and fileName properties
 *
 * @param directoryPath
 * @returns {fs.Stat[]}
 */
ffs.dirInfo = function (directoryPath) {
    return ffs.readdir(directoryPath).then(function (files) {
        return when.map(files, function (file) {
            var filePath = path.resolve(directoryPath, file);

            return ffs.stat(filePath).then(function (stat) {
                stat.filePath = filePath;
                stat.fileName = file;
                return stat;
            });
        });
    });
};

/**
 * Returns all the files from the directory.
 *
 * @param directoryPath
 * @returns {Promise}
 */
ffs.dirFiles = function (directoryPath) {
    return ffs.dirInfo(directoryPath).then(function (files) {
        return files
            .filter(function (file) {
                return file.isFile();
            })
            .map(function (file) {
                return file.fileName;
            });
    });
};
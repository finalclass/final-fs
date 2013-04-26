/*jslint node:true*/
'use strict';

var fs = require('fs'),
    when = require('when'),
    path = require('path'),
    nfs = require('node-fs');


exports.mkdirSync = nfs.mkdirSync;

exports.mkdir = function (dirPath, mode, recursion) {
    var defer = when.defer();

    nfs.mkdir(dirPath, mode, recursion, function (err) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve();
        }
    });

    return defer.promise;
};

exports.rmdirRecursiveSync = function(dirPath) {
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
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            } else {
                exports.rmdirRecursiveSync(filePath);
            }
        }
    }
    fs.rmdirSync(dirPath);
};

exports.rmdirRecursive = function (dirPath) {
    return exports.readdir(dirPath).then(function (files) {
        return when.map(files,
            function removeOrProceed(file) {
                var filePath = path.resolve(dirPath, file);

                return exports.stat(filePath).then(function (stat) {
                    if (stat.isFile()) {
                        return exports.unlink(filePath);
                    } else if (stat.isDirectory()) {
                        return exports.rmdirRecursive(filePath);
                    } else {
                        throw new Error('Wrong file type ' + filePath);
                    }
                });
            })
            .then(function () {
                return exports.rmdir(dirPath); //remove self
            });
    });
};

exports.stat = function (path) {
    var defer = when.defer();

    fs.stat(path, function (err, stat) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(stat);
        }
    });

    return defer.promise;
};

exports.rmdir = function (path) {
    var defer = when.defer();

    fs.rmdir(path, function (err) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve();
        }
    });

    return defer.promise;
};

exports.unlink = function (path) {
    var defer = when.defer();

    fs.unlink(path, function (err) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve();
        }
    });

    return defer.promise;
};

exports.readdir = function (path) {
    var defer = when.defer();

    fs.readdir(path, function (err, files) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(files);
        }
    });

    return defer.promise;
};

exports.createDirIfNotExists = function (dirName) {
    return exports.mkdir(dirName, 0x1ff, true);
};

exports.rename = function (from, to) {
    var def = when.defer();

    fs.rename(from, to, function (err) {
        if (err) {
            def.reject(err);
        } else {
            def.resolve();
        }
    });

    return def.promise;
};

exports.writeJSON = function (filePath, obj) {
    var def = when.defer();
    fs.writeFile(filePath, JSON.stringify(obj, null, '    '), function (err, result) {
        if (err) {
            def.reject(err);
        } else {
            def.resolve(obj);
        }
    });
    return def.promise;
};

exports.readJSON = function (filePath) {
    var def = when.defer();

    fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            def.reject(err);
        } else {
            def.resolve(JSON.parse(data));
        }
    });

    return def.promise;
};

exports.dirInfo = function (directoryPath) {
    return exports.readdir(directoryPath).then(function (files) {
        return when.map(files, function (file) {
            var filePath = path.resolve(directoryPath, file);

            return exports.stat(filePath).then(function (stat) {
                stat.filePath = filePath;
                stat.fileName = file;
                return stat;
            });
        });
    });
};

exports.dirFiles = function (directoryPath) {
    return exports.dirInfo(directoryPath).then(function (files) {
        return files
            .filter(function (file) {
                return file.isFile();
            })
            .map(function (file) {
                return file.fileName;
            });
    });
};
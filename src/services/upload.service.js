import multer from 'multer';
import fs from 'fs';
import mkdirp from 'mkdirp-promise';

let UploadService = {}

const storage = (type) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {

            let path = ''

            process.env.NODE_ENV == 'production'
            ? path = `uploads/users/${req.body.user}/`
            : path = `uploads/users/${req.body.user}/`

            if (type == 'photo'
                || type == 'song') {
                if (file.fieldname == 'photo'
                    && type == 'photo') {
                    path += 'photos/'
                } else if (file.fieldname == 'song'
                    && type == 'song') {
                    path += 'songs/'
                } else {
                    throw new Error(`${file.fieldname} is not a registered fieldname`)
                }

                return mkdirp(path)
                .then(() => {
                    cb(null, path)
                }).catch((e) => {
                    throw new Error(`Could not create upload directory: ${e}`)
                })
            }
        },
        filename: (req, file, cb) => {
            if ((file.fieldname == 'photo' && type == 'photo')
                || (file.fieldname == 'song' && type == 'song')) {
                let fileExtension = file.mimetype.split('/').pop().trim();
                cb(null, file.originalname + '.' + fileExtension);
            }
        }
    })
}

UploadService.upload = (type, name) => {
    return multer({
        storage: storage(type),
        fileFilter: (req, file, cb) => {

            let fileExtension = file.mimetype.split('/').pop().trim();

            if ((file.fieldname !== 'photo' && type !== 'photo')
                && (file.fieldname !== 'song' && type !== 'song')) {
                cb(null, false);
            } else if (fileExtension.toLowerCase() !== 'jpg'
                && fileExtension.toLowerCase() !== 'm4a'
                && fileExtension.toLowerCase() !== 'mp3'
                && fileExtension.toLowerCase() !== 'png'
                && fileExtension.toLowerCase() !== 'jpeg') {
                cb(null, false);
            } else if (req.body.user == undefined || req.body.user == '') {
                cb(null, false);
            } else {
                req.file = file
                cb(null, true);
            }
        }
    }).single(name);
}

UploadService.remove = (path, doc) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) {
                if (err.code == 'ENOENT') {
                    return reject('Attempting to access a location that does not exist.');
                } else if (err.name == 'EACCES') {
                    return reject('Permission denied.')
                } else {
                    return reject(err);
                }
            } else {
                return resolve(doc);
            }
        })
    })
}

export default UploadService

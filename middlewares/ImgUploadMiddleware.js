const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const path = require('path');

const s3Client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: 'AKIA5F4OE7F2N5DX6K7C',
        secretAccessKey: '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',
    },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: 'jstol-bucket',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
});



module.exports = upload;
'use strict';
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);
const appendFile = promisify(fs.appendFile);
const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const { baseDir } = ctx.app;

    const stream = await ctx.getFileStream();
    const name = path.basename(stream.filename);

    const now = Date.now();

    const filePath = path.join(baseDir, '/app/public/files', `/${now}-${name}`);

    const retPath = `/public/files/${now}-${name}`;

    try {
      await new Promise((resolve, reject) => {
        stream.on('data', data => appendFile(filePath, data));
        stream.on('end', () => resolve());
        stream.on('error', error => reject(error));
      });

      this.ctx.body = {
        success: true,
        url: retPath,
      };
    } catch (error) {
      this.ctx.body = {
        success: false,
      };
    }
  }
}

module.exports = UploadController;

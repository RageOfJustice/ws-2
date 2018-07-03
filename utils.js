const { METHODS, STATUSES } = require("./constants");

class Request {
  constructor(buffer) {
    this.headers = {};
    this.method = "";
    this.path = "";
    this.protocol = "HTTP";
    this.version = "1.1";
    this.body = "";

    if (buffer) this.parse(buffer);
  }

  toString() {
    let str = "";
    str += [this.method, this.path, `${this.protocol}/${this.version}`].join(
      " "
    );
    str += "\r\n";

    for (let key in this.headers) {
      str += `${key}: ${this.headers[key]}\r\n`;
    }
    str += "\r\n";

    str += this.body;

    return str.trim();
  }

  setBody(body) {
    this.body = body;
    this.headers["Content-length"] = body.length;
    return this;
  }

  addHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  setPath(path) {
    this.path = path;
    return this;
  }

  setProtocol(protocol) {
    this.protocol = protocol;
    return this;
  }

  setVersion(version) {
    this.version = version;
    return this;
  }

  parse(buffer) {
    const initialStr = buffer.toString();
    const str = initialStr.split("\r\n");
    const firstLine = str[0];
    const emptyIndex = str.indexOf("");
    const headersLines = str.slice(1, emptyIndex);
    //parse first line
    const splitFirstLine = firstLine.split(" ");
    this.method = splitFirstLine[0];
    this.path = splitFirstLine[1];
    const [prot, ver] = splitFirstLine[2].split("/");
    this.protocol = prot;
    this.version = ver;

    //parse headers
    for (let headerLine of headersLines) {
      const [key, value] = headerLine.split(":", 2);
      this.headers[key.trim()] = value.trim();
    }

    if (this.method === METHODS.GET) {
      const contentLength = this.headers["Content-length"];

      let body = "";
      for (let i = 0; i < contentLength; i++) {
        body += str[emptyIndex + 1][i];
      }
      this.body = body;
    }
  }
}

class Response {
  constructor(buffer) {
    this.headers = {};
    this.status = 200;
    this.path = "";
    this.protocol = "HTTP";
    this.version = "1.1";
    this.body = "";

    if (buffer) this.parse(buffer);
  }

  toString() {
    let str = "";
    str += [
      `${this.protocol}/${this.version}`,
      this.status,
      STATUSES[`${this.status}`]
    ].join(" ");
    str += "\r\n";

    for (let key in this.headers) {
      str += `${key}: ${this.headers[key]}\r\n`;
    }
    str += "\r\n";

    str += this.body;

    return str.trim();
  }

  setBody(body) {
    this.body = body;
    this.headers["Content-length"] = body.length;
    return this;
  }

  addHeader(key, value) {
    this.headers[key] = value;
    return this;
  }

  setStatus(status) {
    this.status = status;
    return this;
  }

  setProtocol(protocol) {
    this.protocol = protocol;
    return this;
  }

  setVersion(version) {
    this.version = version;
    return this;
  }

  parse(buffer) {
    const initialStr = buffer.toString();
    const str = initialStr.split("\r\n");
    const firstLine = str[0];
    const emptyIndex = str.indexOf("");
    const headersLines = str.slice(1, emptyIndex);
    //parse first line
    const splitFirstLine = firstLine.split(" ");
    this.method = splitFirstLine[0];
    this.path = splitFirstLine[1];
    const [prot, ver] = splitFirstLine[2].split("/");
    this.protocol = prot;
    this.version = ver;

    //parse headers
    for (let headerLine of headersLines) {
      const [key, value] = headerLine.split(":", 2);
      this.headers[key.trim()] = value.trim();
    }

    if (this.method === METHODS.GET) {
      const contentLength = this.headers["Content-length"];

      let body = "";
      for (let i = 0; i < contentLength; i++) {
        body += str[emptyIndex + 1][i];
      }
      this.body = body;
    }
  }
}

module.exports = {
  Request,
  Response
};

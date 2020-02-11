class Serializer {
  static encode(message) {
    return JSON.stringify(message);
  }

  static decode(message) {
    return JSON.parse(message);
  }
}

module.exports = Serializer;

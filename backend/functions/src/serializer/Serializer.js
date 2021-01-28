class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  filterObject(data) {
    const obj = {};

    this.publicFields.forEach((field) => {
      if (data.hasOwnProperty(field)) {
        obj[field] = data[field];
      }
    });

    return obj;
  }

  filter(data) {
    if (Array.isArray(data)) {
      data = data.map((item) => this.filterObject(item));
    } else {
      data = this.filterObject(data);
    }

    return data;
  }

  serialize(data) {
    data = this.filter(data);
    return this.json(data);

    // if (this.contentType === "application/json") {
    //   return this.json(data);
    // }

    // if (this.contentType === "application/xml") {
    //   return this.xml(data);
    // }

    throw new ValueNotSupported(this.contentType);
  }
}

class UserSerializer extends Serializer {
  constructor(contentType, extraFields = []) {
    super();
    this.contentType = contentType;
    this.publicFields = [
      "uid",
      "email",
      "displayName",
      "customClaims",
      "metadata",
      "providerData",
    ].concat(extraFields);
    this.tagSingular = "user";
    this.tagPlural = "users";
  }
}

module.exports = { UserSerializer };

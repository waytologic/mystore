
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Sample API",
      "description": "A sample API to demonstrate OpenAPI specification",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "http://localhost:1947",
        "description": "Local server"
      }
    ],
    "api": [
      "src/**/*.js"
    ],
    "tags": [
      {
        "name": "Users",
        "description": "Everything about users"
      }
    ],
    "paths": {
      "/api/register": {
        "post": {
          "tags": [
            "Users"
          ],
          "summary": "User register",
          "description": "Register a new user",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserSchema"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "User registered successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "allOf": [
                      {
                        "$ref": "#/components/schemas/UserSchema"
                      },
                      {
                        "type": "object",
                        "properties": {
                          "id": {
                            "type": "string",
                            "example": "66b84a7e311cbda81df90f68"
                          }
                        },
                        "required": [
                          "id"
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "400": {
              "description": "Invalid request data"
            }
          }
        }
      },
      "/api/login": {
        "post": {
          "tags": [
            "Users"
          ],
          "summary": "User login",
          "description": "Authenticate a user",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "description": "User email",
                      "example": "user@example.com"
                    },
                    "password": {
                      "type": "string",
                      "description": "User password",
                      "example": "Password@123"
                    }
                  },
                  "required": [
                    "email",
                    "password"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "token": {
                        "type": "string",
                        "description": "Authentication token"
                      },
                      "username": {
                        "type": "string",
                        "description": "User name"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Please check input data"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/api/users": {
        "get": {
          "tags": [
            "Users"
          ],
          "summary": "Get all users",
          "description": "Load all users in the users collection.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "All users loaded successfully"
            },
            "400": {
              "description": "No token provided"
            }
          }
        }
      },
      "/api/logout": {
        "post": {
          "tags": [
            "Users"
          ],
          "summary": "User logout",
          "description": "Logout a user by invalidating the provided token.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Logged out successfully"
            },
            "400": {
              "description": "No token provided"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "UserSchema": {
          "type": "object",
          "properties": {
            "username": {
              "type": "string",
              "description": "User name",
              "example": "Test"
            },
            "email": {
              "type": "string",
              "description": "User email",
              "example": "user@example.com"
            },
            "password": {
              "type": "string",
              "description": "User password",
              "example": "Password@123"
            },
            "phone": {
              "type": "string",
              "description": "User phone number",
              "example": "9551766353"
            }
          },
          "required": [
            "username",
            "email",
            "password",
            "phone"
          ]
        }
      },
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}

'use strict';

const privates = require('./private-map');
const members = require('./group-members');
const request = require('request');

/**
 * @module users
 */

module.exports = {
  find: find,
  join: join,
  members: members
};

/**
  Get group hierarchy. Only name and ids are returned.

  @param {string} realmName - The name of the realm(not the realmID) - ex: master
  @returns {Promise} A promise that will resolve with an Array of group objects
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.groups.find(realmName)
        .then((groupList) => {
          console.log(groupList) // [{...},{...}, ...]
        })
      });
 */
function find(client) {
  return function find(realm) {
    return new Promise((resolve, reject) => {
      const req = {
        auth: {
          bearer: privates.get(client).accessToken
        },
        json: true,
        url: `${client.baseUrl}/admin/realms/${realm}/groups`
      };

      request(req, (err, resp, body) => {
        if (err) {
          return reject(err);
        }

        if (resp.statusCode !== 200) {
          return reject(body);
        }

        return resolve(body);
      });
    });
  };
}


/**
  Get group hierarchy. Only name and ids are returned.

  @param {string} realmName - The name of the realm(not the realmID) - ex: master
  @returns {Promise} A promise that will resolve with an Array of group objects
  @example
  keycloakAdminClient(settings)
    .then((client) => {
      client.groups.find(realmName)
        .then((groupList) => {
          console.log(groupList) // [{...},{...}, ...]
        })
      });
 */
function join(client) {
  return function join(realm, userId, groupId) {
    return new Promise((resolve, reject) => {
      const req = {
        method: 'PUT',
        auth: {
          bearer: privates.get(client).accessToken
        },
        json: true,
        body: {
          realm: realm,
          userId: userId,
          groupid: groupId
        },
        url: `${client.baseUrl}/admin/realms/${realm}/users/${userId}/groups/${groupId}`
      };

      request(req, (err, resp, body) => {
        if (err) {
          return reject(err);
        }

        if (resp.statusCode !== 200) {
          return reject(body);
        }

        return resolve(body);
      });
    });
  };
}
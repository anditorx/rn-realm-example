import Realm from 'realm';
import {DB_TEST_REALM, REALM_SCHEMA_USER} from '../constant/Constant';

// NOTE: UserList_Schema is the same as the Realm schema
export const UserList_Schema = {
  name: REALM_SCHEMA_USER,
  properties: {
    user_id: {type: 'int', default: 0},
    user_fullname: 'string',
    user_phone: 'string',
    user_email: 'string',
    user_address: 'string',
    user_password: 'string',
  },
};

// NOTE: databaseOptions is the object that connects to our realm database
const databaseOptions = {
  path: DB_TEST_REALM,
  schema: [UserList_Schema],
  schemaVersion: 0,
};

// NOTE: queryAllUserLists is a function that returns all the user lists in the database
export const queryAllUserLists = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let allUserLists = realm.objects(REALM_SCHEMA_USER);
          resolve(allUserLists);
        });
      })
      .catch(error => reject(error));
  });

// NOTE: createNewUser is a function that creates a new user list in the database
export const createNewUser = newUser =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          var ID =
            realm.objects(REALM_SCHEMA_USER).sorted('user_id', true).length > 0
              ? realm.objects(REALM_SCHEMA_USER).sorted('user_id', true)[0]
                  .user_id + 1
              : 1;
          realm.create(REALM_SCHEMA_USER, {
            user_id: ID,
            user_fullname: newUser?.fullName,
            user_phone: newUser?.phoneNumber,
            user_email: newUser?.email?.toLowerCase(),
            user_address: newUser?.address,
            user_password: newUser?.password,
          });
          resolve(newUser);
        });
      })
      .catch(error => reject(error));
  });

// NOTE: createUserDummy is a function that creates a new user dummy in the database
export const createUserDummy = newUser =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(REALM_SCHEMA_USER, newUser);
          resolve(newUser);
        });
      })
      .catch(error => reject(error));
  });

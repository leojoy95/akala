'use strict';
import debug from 'debug';
import { v4 as uuid } from 'uuid';
const logger = debug('json-rpc-ws');

import { Connection, Handler, PayloadDataType, Parent, SocketAdapter } from './shared-connection';



/**
 * Base functionality shared by client and server
 *
 * @constructor
 * @public
 */
export abstract class Base<TStreamable, TConnection extends Connection<TStreamable> = Connection<TStreamable>> implements Parent<TStreamable, TConnection>
{
  constructor(public type: string)
  {

  }

  public id = uuid();

  public browser: boolean = false;

  private requestHandlers: { [method: string]: Handler<TConnection, TStreamable, any, any> } = {};

  protected connections: { [id: string]: Connection<any> } = {};


  /**
   * Add a handler function for a given method
   *
   * @param {String} method - name of the method to add handler for.
   * @param {function} handler - function to be passed params for given method.
   * @todo enforce handler w/ two-param callback
   * @public
   */
  public expose<TParamType extends PayloadDataType<TStreamable>, TReplyType extends PayloadDataType<TStreamable>>(method: string, handler: Handler<TConnection, TStreamable, TParamType, TReplyType>)
  {
    logger('registering handler for %s', method);
    if (this.requestHandlers[method])
    {
      throw Error('cannot expose handler, already exists ' + method);
    }
    this.requestHandlers[method] = handler;
  };

  /**
   * Connected event handler
   *
   * @param {Object} socket - new socket connection
   * @private
   */
  public connected(socket: SocketAdapter)
  {
    var connection = this.connection(socket);
    logger('%s connected with id %s', this.type, connection.id);

    this.connections[connection.id] = connection;
  }

  abstract connection(socket: SocketAdapter): Connection<any>;
  ;

  /**
   * Disconnected event handler
   *
   * @param {Object} connection - connection object that has been closed
   * @private
   */
  public disconnected(connection: Connection<TStreamable>)
  {

    logger('disconnected');
    delete this.connections[connection.id];
  };

  /**
   * Test if a handler exists for a given method
   *
   * @param {String} method - name of method
   * @returns {Boolean} whether or not there are any handlers for the given method
   * @public
   */
  public hasHandler(method: string)
  {
    if (this.requestHandlers[method] !== undefined)
    {
      return true;
    }
    return false;
  };

  /**
   * Get handler for a given method
   *
   * @param {String} method - name of method
   * @returns {Array}  - handler for given method
   * @public
   */
  public getHandler(method: string)
  {
    return this.requestHandlers[method];
  };

  /**
   * Get a connection by id
   *
   * @param {id} id - id of the connection to get
   * @returns {Connection} - Connection
   * @public
   */
  public getConnection(id: string)
  {
    return this.connections[id];
  };

  /**
   * Shut down all existing connections
   *
   * @public
   */
  public hangup()
  {
    logger('hangup');
    var connections = Object.keys(this.connections);
    connections.forEach(function hangupConnection(this: Base<TStreamable, TConnection>, id)
    {
      this.connections[id].close();
      delete this.connections[id];
    }, this);
  };
}
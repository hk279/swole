/**
 * Thrown by the query layer when a record either does not exist or does not
 * belong to the requesting user. Both cases deliberately surface as a 404 so an
 * attacker cannot use the response to probe for other users' record ids.
 */
export class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

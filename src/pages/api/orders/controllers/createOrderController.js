// Database
// Services
import { createOrderService } from '../services';


/**
 * Handler description
 *
 * PATH: /api/...
 * AUTH-REQUIRED: false
 * ADMIN-REQUIRED: false
 *
 * @param { Object } req - The HTTP request object.
 * @param { Object } res - The HTTP response object.
 * @returns { void }
 */
const createOrderController = async ( req, res ) => {
  try {
    const { body } = await createOrderService( req );

    res.status( 201 ).json({
      ok: true,
      body
    });
  
  } catch ( error ) {
    console.log( `${ '[CONTROLLER.CREATE-ORDER]'.bgRed }: ${ error }` );

    res.status( 500 ).json({
      ok: false,
      message: 'Something went wrong. Talking the Admin'
    });
  }
}

export default createOrderController;

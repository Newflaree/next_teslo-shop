// Controllers
import { payOrderController } from './controllers';


export default function handler( req, res ) {
  switch ( req.method ) {
    case 'POST':
      return payOrderController( req, res );
  
    default:
      return res.status( 400 ).json({
        ok: false,
        message: 'Endpoint not implemented'
      });
  }
}

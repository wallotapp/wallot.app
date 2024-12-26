import { CloudTaskHandler } from 'ergonomic-node';
import { PlaceAlpacaOrdersListenerTaskParams } from '@wallot/node';

export const handlePlaceAlpacaOrders: CloudTaskHandler<
	PlaceAlpacaOrdersListenerTaskParams
> = async ({ data: { orderId } }) => {
	// TODO
	orderId;
	return Promise.resolve();
};

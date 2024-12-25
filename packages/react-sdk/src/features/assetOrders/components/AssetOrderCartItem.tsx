import { default as cn } from 'ergonomic-react/src/lib/cn';
import { AssetOrder } from '@wallot/js';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { FiTrendingUp } from 'react-icons/fi';

export const AssetOrderCartItem: React.FC<
	{
		assetOrder: AssetOrder;
	} & BaseComponent
> = ({ assetOrder: { alpaca_order_symbol, amount }, className = '' }) => {
	const amountUsdString = getCurrencyUsdStringFromCents(amount);

	return (
		<div
			className={cn(
				'bg-white border border-gray-200 rounded-md shadow-md p-6',
				className,
			)}
		>
			<div className='flex justify-between items-end'>
				<div className='flex items-start space-x-4'>
					<div className='bg-black p-5 rounded-lg w-fit h-fit'>
						<FiTrendingUp className='text-white text-4xl' />
					</div>
					<div>
						<p className='font-bold text-base'>{alpaca_order_symbol}</p>
						<p className={cn('text-sm font-light text-gray-600', 'mt-1')}>
							US Securities Purchase
						</p>
					</div>
				</div>
				<div>
					<p>Order</p>
					<p>{amountUsdString}</p>
				</div>
			</div>
		</div>
	);
};

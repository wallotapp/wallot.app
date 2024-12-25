import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import Image from 'next/image';
import { BsBank } from 'react-icons/bs';
import { default as cn } from 'ergonomic-react/src/lib/cn';

const BANK_LOGOS: Record<string, string> = {
	// 1. JPMorgan Chase (Chase)
	Chase: '/img/banks/chase.png',
	'Chase Bank': '/img/banks/chase.png',
	'Chase Bank (US)': '/img/banks/chase.png',
	'JPMorgan Chase': '/img/banks/chase.png',
	'Chase Bank (National Association)': '/img/banks/chase.png',

	// 2. Bank of America
	'Bank of America': '/img/banks/bofa.png',
	'Bank of America Corporation': '/img/banks/bofa.png',
	BofA: '/img/banks/bofa.png',
	BoA: '/img/banks/bofa.png',
	'Bank of America, N.A.': '/img/banks/bofa.png',

	// 3. Wells Fargo
	'Wells Fargo': '/img/banks/wells.png',
	'Wells Fargo Bank': '/img/banks/wells.png',
	'Wells Fargo & Company': '/img/banks/wells.png',

	// 4. Citibank
	Citibank: '/img/banks/citi.png',
	Citi: '/img/banks/citi.png',
	'Citibank NA': '/img/banks/citi.png',
	Citigroup: '/img/banks/citi.png',

	// 5. U.S. Bank
	'U.S. Bank': '/img/banks/usbank.png',
	'US Bank': '/img/banks/usbank.png',
	'U.S. Bancorp': '/img/banks/usbank.png',

	// 6. PNC Bank
	PNC: '/img/banks/pnc.png',
	'PNC Bank': '/img/banks/pnc.png',
	'PNC Financial Services': '/img/banks/pnc.png',

	// 7. Truist (formed from BB&T and SunTrust)
	Truist: '/img/banks/truist.png',
	'BB&T': '/img/banks/truist.png',
	'BB&T Bank': '/img/banks/truist.png',
	SunTrust: '/img/banks/truist.png',
	'SunTrust Bank': '/img/banks/truist.png',

	// 8. TD Bank
	'TD Bank': '/img/banks/td.png',
	'Toronto-Dominion Bank': '/img/banks/td.png',
	TD: '/img/banks/td.png',

	// 9. Capital One
	'Capital One': '/img/banks/capitalone.png',
	'Cap One': '/img/banks/capitalone.png',
	'Capital One Bank': '/img/banks/capitalone.png',

	// 10. HSBC
	HSBC: '/img/banks/hsbc.png',
	'HSBC Bank': '/img/banks/hsbc.png',
	'HSBC Bank USA': '/img/banks/hsbc.png',

	// 11. Goldman Sachs
	'Goldman Sachs': '/img/banks/goldman.png',
	'Marcus by Goldman Sachs': '/img/banks/goldman.png',
	'Goldman Sachs Bank USA': '/img/banks/goldman.png',

	// 12. Ally Bank
	Ally: '/img/banks/ally.png',
	'Ally Bank': '/img/banks/ally.png',

	// 13. Fifth Third Bank
	'Fifth Third Bank': '/img/banks/fifth-third.png',
	'5/3 Bank': '/img/banks/fifth-third.png',

	// 14. Citizens Bank
	Citizens: '/img/banks/citizens.png',
	'Citizens Bank': '/img/banks/citizens.png',
	'Citizens Bank NA': '/img/banks/citizens.png',

	// 15. KeyBank
	KeyBank: '/img/banks/keybank.png',
	'Key Bank': '/img/banks/keybank.png',
	'KeyBank National Association': '/img/banks/keybank.png',
};

type BankIconProps = BaseComponent & {
	bankName: string | null;
	showBankNameAsTitle?: boolean;
	size?: number;
	subtitle?: string;
};
export const BankIcon: React.FC<BankIconProps> = ({ bankName, className = '', showBankNameAsTitle = false, size = 32, subtitle = '' }) => {
	const bankLogo = bankName == null ? null : BANK_LOGOS[bankName];

	if (bankLogo == null) {
		return (
			<div className={cn(className, showBankNameAsTitle && 'flex items-center space-x-3')}>
				<div>
					{showBankNameAsTitle ? (
						<div>
							<BsBank className='text-3xl' />
						</div>
					) : (
						<div className={cn('flex flex-col items-center space-y-0.5')}>
							<div>
								<BsBank className='text-xl' />
							</div>
							<div className=''>
								<p className='font-light text-xs'>{bankName}</p>
							</div>
						</div>
					)}
				</div>
				{showBankNameAsTitle && (
					<div>
						<div>
							<p className='font-semibold text-sm'>{bankName}</p>
						</div>
						{Boolean(subtitle) && (
							<div className=''>
								<p className='font-extralight text-xs'>{subtitle}</p>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}

	return (
		<div className={cn(className, showBankNameAsTitle && 'flex items-center space-x-3')}>
			<div>
				<Image src={bankLogo} alt={`${bankName} logo`} width={size} height={size} />
			</div>
			{showBankNameAsTitle && (
				<div>
					<div>
						<p className='font-semibold text-sm'>{bankName}</p>
					</div>
					{Boolean(subtitle) && (
						<div className=''>
							<p className='font-extralight text-xs'>{subtitle}</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

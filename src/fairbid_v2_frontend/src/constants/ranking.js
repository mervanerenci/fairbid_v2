// components
import Avatar from '@ui/Avatar';
import {NavLink} from 'react-router-dom';
import CryptoIcon from '@ui/CryptoIcon';
import Fade from '@mui/material/Fade';

// utils
import {addZero, formatNumber} from '@utils/helpers';

export const getPeriod = (period, value, average = false, rate = 1) => {
    const yearValue = value.year * rate;
    const monthValue = value.month * rate;
    const weekValue = value.week * rate;
    const total = yearValue + monthValue + weekValue;

    switch (period.value) {
        default:
        case 'all':
            return average ? (total / 3).toFixed(2) : total;
        case 'year':
            return yearValue;
        case 'month':
            return monthValue;
        case 'week':
            return weekValue;
    }
}

const CellWrapper = ({children}) => {
    return (
        <Fade in={true} timeout={1000}>
            {children}
        </Fade>
    );
}

export const CollectionCell = ({value}) => {
    return (
        <CellWrapper>
            <div className="d-flex align-items-center g-15">
                <Avatar src={value.img} alt={value.name} isVerified={value.isVerified} size="sm"/>
                <NavLink to="/author">@{value.name}</NavLink>
            </div>
        </CellWrapper>
    )
}

export const CryptoCell = ({value, type, period}) => {
    const rate = type.value === 'eth' ? 1 : 2866.96;

    return (
        <CellWrapper>
            <div className="d-flex align-items-center justify-content-center g-10 text-uppercase">
                {
                    value &&
                    <>
                        <CryptoIcon crypto={type.value}/>
                        {formatNumber(getPeriod(period, value, true, rate))}
                    </>
                }
            </div>
        </CellWrapper>
    );
}

export const PercentCell = ({value, period}) => {
    const displayValue = value ? getPeriod(period, value, true) : 0;

    return (
        <CellWrapper>
             <span className={displayValue > 0 ? 'text-accent' : 'text-body'}>
                {value && `${displayValue > 0 ? '+' : ''}${formatNumber(displayValue)}%`}
             </span>
        </CellWrapper>
    )
}

export const TextCell = ({value, period}) => {
    return (
        <CellWrapper>
             <span className="text-uppercase">
                {value && formatNumber(getPeriod(period, value))}
             </span>
        </CellWrapper>
    );
}

export const COLUMNS = (period, category, type) => [
    {
        field: 'id',
        headerName: '#',
        minWidth: 50,
        maxWidth: 90,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        renderCell: (params) => {
            const rowIndex = params.api.getRowIndex(params.id) + 1;

            return (
                <span className="text-accent">
                    {addZero(rowIndex)}
                </span>
            )
        }
    },
    {
        field: 'collection',
        headerName: 'Collection',
        minWidth: 200,
        maxWidth: 400,
        flex: 1,
        renderCell: ({value}) => <CollectionCell value={value}/>
    },
    {
        field: 'volume',
        headerName: 'Volume',
        minWidth: 80,
        maxWidth: 160,
        flex: 1,
        renderCell: ({value}) => <CryptoCell value={value} type={type} period={period}/>
    },
    {
        field: 'h24',
        headerName: '24h %',
        minWidth: 80,
        maxWidth: 160,
        flex: 1,
        renderCell: ({value}) => <PercentCell value={value} period={period}/>
    },
    {
        field: 'd7',
        headerName: '7d %',
        minWidth: 80,
        maxWidth: 160,
        flex: 1,
        renderCell: ({value}) => <PercentCell value={value} period={period}/>
    },
    {
        field: 'floor',
        headerName: 'Floor Price',
        minWidth: 80,
        maxWidth: 160,
        flex: 1,
        renderCell: ({value}) => <CryptoCell value={value} type={type} period={period}/>
    },
    {
        field: 'owners',
        headerName: 'Owners',
        minWidth: 80,
        maxWidth: 160,
        flex: 1,
        renderCell: ({value}) => <TextCell value={value} period={period}/>
    },
    {
        field: 'items',
        headerName: 'Items',
        minWidth: 80,
        maxWidth: 160,
        flex: 1,
        renderCell: ({value}) => <TextCell value={value} period={period}/>
    }
];

export const FILTERS = {
    period: [
        {value: 'all', label: 'All time'},
        {value: 'week', label: 'Week'},
        {value: 'month', label: 'Month'},
        {value: 'year', label: 'Year'},
    ],
    category: [
        {value: 'all', label: 'All categories'},
        {value: 'art', label: 'Art'},
        {value: 'collectibles', label: 'Collectibles'},
        {value: 'games', label: 'Games'},
        {value: 'music', label: 'Music'},
    ],
    type: [
        {value: 'eth', label: 'Ethereum'},
        {value: 'imx', label: 'Immutable X'},
    ]
}
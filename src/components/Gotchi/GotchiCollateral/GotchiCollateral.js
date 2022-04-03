import React from 'react';
import { Tooltip } from '@mui/material';

import graphUtils from 'utils/graphUtils';

import { CustomTooltipStyles } from '../styles';
import styles from './styles';

export default function GotchiCollateral({ gotchi }) {
    const classes = {
        ...CustomTooltipStyles(),
        ...styles()
    };
    const collateral = graphUtils.getCollateralName(gotchi.collateral);

    return (
        <Tooltip
            title={collateral}
            classes={{ tooltip: classes.customTooltip }}
            enterTouchDelay={0}
            placement='top'
            followCursor
        >
            <div className={classes.gotchiCollateral}>
                <img
                    src={graphUtils.getCollateralImg(collateral)}
                    width={25}
                    alt={collateral}
                />
            </div>
        </Tooltip>
    );
}
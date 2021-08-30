import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import commonUtils from '../../utils/commonUtils';
import itemUtils from '../../utils/itemUtils';

const useStyles = makeStyles((theme) => ({
    item: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.secondary.dark,
        padding: '16px 12px',
        textAlign: 'center',
        height: '100%',
        position: 'relative',
        '&.common': {
            backgroundColor: fade(theme.palette.rarity.common, .1)
        },
        '&.uncommon': {
            backgroundColor: fade(theme.palette.rarity.uncommon, .1)
        },
        '&.rare': {
            backgroundColor: fade(theme.palette.rarity.rare, .1)
        },
        '&.legendary': {
            backgroundColor: fade(theme.palette.rarity.legendary, .1)
        },
        '&.mythical': {
            backgroundColor: fade(theme.palette.rarity.mythical, .1)
        },
        '&.godlike': {
            backgroundColor: fade(theme.palette.rarity.godlike, .1)
        },
    },
    itemTitle: {
        '&.common': {
            color: theme.palette.rarity.common
        },
        '&.uncommon': {
            color: theme.palette.rarity.uncommon
        },
        '&.rare': {
            color: theme.palette.rarity.rare
        },
        '&.legendary': {
            color: theme.palette.rarity.legendary
        },
        '&.mythical': {
            color: theme.palette.rarity.mythical
        },
        '&.godlike': {
            color: theme.palette.rarity.godlike
        },
    },
    owner: {
        borderRadius: theme.shape.borderRadius,
        fontSize: 12,
        padding: '2px 4px',
    },
}));

export default function Item({item, owners}) {
    const classes = useStyles();
    const name = itemUtils.getItemNameById(item.itemId);
    const rarity = itemUtils.getItemRarityById(item.itemId);
    const stats = itemUtils.getItemStatsById(item.itemId);

    const getItemImagePath = (id) => {
        try {
            return require(`../../assets/wearables/${id}.svg`).default;
        } catch (error) {
            return require(`../../assets/images/no-image2.svg`).default;
        }
    };

    const renderOwners = () => {
        if(owners) {
            return (
                <Box>
                    <Typography variant={'body2'}>
                        Owned by:
                    </Typography>
                    {
                        item.owners.map((owner, i) => {
                            return <Typography variant={'body2'} key={i} style={{marginTop: 4}}>
                                <Box component={'span'} className={classNames(classes.owner)} style={{ backgroundColor: owner.color }}>
                                    {commonUtils.cutAddress(owner.id)}
                                </Box>
                                <Box component={'span'} style={{marginLeft: 12}}>
                                    - {owner.balance}
                                </Box>
                            </Typography>
                        })
                    }
                </Box>
            )
        } else {
            return null;
        }
    }

    return (
        <Box className={classNames(classes.item, rarity)} style={{marginBottom: 20}}>
            <img
                src={getItemImagePath(item.itemId)}
                alt={name}
                height={75}
                width={75}
            />
            <Typography className={classNames(classes.itemTitle, rarity)}>
                {name}
            </Typography>
            <Typography variant={'body2'}>
                {stats}
            </Typography>
            {renderOwners()}
        </Box>
    )
}
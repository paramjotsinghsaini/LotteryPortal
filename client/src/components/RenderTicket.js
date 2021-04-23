import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

export default function RenderTicket(props){
    const [isPurchased, setIsPurchased] = useState(false);
    const users = props.users;
    function bookTicket(e, ticketId){
        e.preventDefault();
        console.log(ticketId);
        setIsPurchased(true);
    }
    useEffect(()=>{
        if(users && users.length > 0)
        {
            setIsPurchased(true);
        }
    }, [users]);
    return (
            <Button key={props.id} size="small" color="primary" disabled={isPurchased} title={isPurchased ? "Already Purchased": ""} data-id={props.id} onClick={(e) => bookTicket(e, props.id, props.evnetId)}>
                {props.number}
            </Button>
    );
}
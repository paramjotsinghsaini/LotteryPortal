import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { buyTicket } from '../functions/ticket';
import { getUser } from '../functions/authUser';
import { socket } from '../services/socket';

const setDisabled = (ifTicketPurchased, ifTicketSold, insufficientCredits) => {
    if(ifTicketPurchased === true)
    {
        return true;
    }
    if(insufficientCredits === true)
    {
        return true;
    }
    if(ifTicketSold === true)
    {
        return true;
    }
    return false;

}
export default function RenderButton(props){
    const history = useHistory();
    const handlePurchase = (eventId) => {
        if(eventId)
        {
            buyTicket(eventId).then((response)=>{
                    if(response.data && response.data.message)
                    {
                        history.push('/lottery/'+eventId);
                    }
                }
            );
        }
    };

    const [text, setText] = useState("Buy");
    const [ifTicketPurchased, setIfTicketPurchased] = useState(false);
    const [ifTicketSold, setIfTicketSold] = useState(false);
    const [insufficientCredits, setInsufficientCredits] = useState(false);
    const [credit, setCredit] = useState(0);
    useEffect(()=>{
        socket.on('Credits', data => {
            if(data)
            {
                setCredit(data.amount);
                if(props.entry > data.amount)
                {
                    setInsufficientCredits(true);
                    setText("Insufficient balance");
                }
                else{
                    setInsufficientCredits(false);
                    setText("Buy")
                }
            }
        });
        socket.on("currentParticipants", data => {
            if(data && data.count && data.count === props.max)
            {
                setIfTicketSold(true);
                setText("Sold")
            }
            else{
                setIfTicketSold(false);
                setText("Buy")
            }
        })
        const user = getUser()
        socket.on("ticketPurchased", data => {
            if(data && data.flag)
            {
                setIfTicketPurchased(true);
                setIfTicketSold(false);
                setText("Draw");
            }
            else{
                setIfTicketPurchased(false);
                setText("Buy")
            }
        })
        var interval = setInterval(()=>{
            socket.emit("checkParticipants", {eventId: props.id});
            socket.emit("ticketPurchased", {eventId: props.id, userId: user.id});
        }, 1000);
        

    },[props, credit]);
    return (
        <div>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                disabled = {setDisabled(ifTicketPurchased, ifTicketSold, insufficientCredits)}
                onClick={ (e) => handlePurchase(props.id) }
            >
                {text}
            </Button>
        </div>
    );
}
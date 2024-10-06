
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, Text,Textarea,Spinner} from '@chakra-ui/react'


function Chat(){
    const [query, setQuery] = useState('');
    const [reply, setReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleQuery = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: query }),
            });

            const data = await response.json();
            setReply(data.output || data.error);
        } catch (error) {
            setReply('Error sending query');
        }
        setIsLoading(false);
    };
    return (
        <>
            <Text height={'70%'} padding={'4vh'} bg={'#f0f0f0'}width={'100%'} whiteSpace={'pre-wrap'} overflowY={'scroll'}overflowX={'auto'} >
            <ReactMarkdown>{reply}</ReactMarkdown></Text>
            <Textarea bg={'EDE8F5'} height={'20%'} placeholder={"Enter here!"} onChange={(e) => setQuery(((e.target.value)))}></Textarea>
            <Button height={'10%'} onClick={handleQuery}>Search</Button>
            {isLoading && <Spinner size='lg' 
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'/>}
        </>
        
        
    )
}
export default Chat;
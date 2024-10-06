
import { ChakraProvider, Flex } from '@chakra-ui/react'
import Dropzone from './dropzone.js';
import Chat from './chat.js';
function App() {
  return (
    <ChakraProvider>
      <Flex height={'100vh'} flexDirection={'column'}>
        <Chat/>
        <Dropzone/>
      </Flex>
      
    </ChakraProvider>
    
  );
}

export default App;

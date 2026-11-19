import { useEffect, useState } from "react"

function WelcomePage() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('Welcome to React');
  }, []);
  return <button onClick={() => setCount(c => c + 1)}>
    Clicked {count} times
  </button>;
}

function CounterTitle() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`Count: ${count}`);
  }, []);
  return <button onClick={() => setCount(c => c + 1)}>
    Increase: {count}
  </button>;
}


function NameTitle() {
  const [name, setName] = useState('');
  useEffect(() => {
    console.log(name.trim() || 'My React App in useEffect');
  }, [name]);
  return (
    <label>
      Your name
      <input value={name}
        onChange={e => setName(e.target.value)} />
      <p>Welcome, {name || 'student'}! these is the useState</p>
    </label>
  );
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <time>{now.toLocaleTimeString()}</time>;
}

function WindowWidth() {
  const [width, setWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return <p>Window width: {width}px</p>;
}

function Room({ roomId }) {
  useEffect(() => {
    console.log('START room', roomId);
    return () => console.log('STOP room', roomId);
  }, [roomId]);
  return <p>Current room: {roomId}</p>;
}

function BrokenClock() {
  useEffect(() => {
    setInterval(() => console.log('tick'), 1000);
  }, []);
  return <p>Clock is running</p>;
}

function SafeClock() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <p>Seconds: {seconds}</p>;
}

const messageBus = new EventTarget();

function MessageViewer() {
  const [message, setMessage] = useState('Nothing yet');
  useEffect(() => {
    function receive(event) { setMessage(event.detail); }
    messageBus.addEventListener('message', receive);
    return () => messageBus.removeEventListener('message', receive);
  }, []);
  return <p>Latest message: {message}</p>;
}

function SendMessage() {
  return <button onClick={() => {
    messageBus.dispatchEvent(new CustomEvent('message', {
      detail: 'Hello from the event bus!'
    }));
  }}>Send message</button>;
}


function UserName({ userId }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    let ignore = false;
    setUser(null);
    async function load() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.ok) throw new Error('Request failed');
        const data = await response.json();
        if (!ignore) setUser(data);
      } catch (error) {
        if (!ignore) console.error(error);
      }
    }
    load();
    return () => { ignore = true; };
  }, [userId]);
  return <p>{user ? user.name : 'Loading user...'}</p>;
}



function UserDetails({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function loadUser() {
      setLoading(true);
      setError('');
      setUser(null);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error('Could not load user');
        const data = await response.json();
        if (!controller.signal.aborted) setUser(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadUser();
    return () => controller.abort();
  }, [userId]);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  if (!user) return <p>No user found.</p>;
  return <h2>{user.name}</h2>;
}

function BrokenCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(count + 1), 1000);
    return () => clearInterval(id);
  }, []); // count is captured from the initial render
  return <p>{count}</p>;
}

function GoodCounter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{count}</p>;
}






export default function App() {
   
  const [count, setCount] = useState(0)
  const [roomId, setRoomId] = useState(1);
  useEffect(() => {
   console.log('Effect ran after render:', count);
  }, [count]); 

  useEffect(() => {
  window.addEventListener('resize', () => console.log('resize'));
  return () => {
    window.removeEventListener('resize', () => console.log('resize'));
  };
}, []);

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 onClick={() => setCount(count + 1)}>
        {count}
      </h1>
      <WelcomePage />
      <CounterTitle />
      <NameTitle />
      <Clock />
      <WindowWidth />
      <button onClick={() => setRoomId(id => id + 1)}>
      Next room
    </button>
    <Room roomId={roomId} />
    <SafeClock />
    <MessageViewer />
    <SendMessage />
    <UserName userId={5} />
    <UserDetails userId={10} />
    <BrokenCounter />
    <GoodCounter />
    </div>
  )
}
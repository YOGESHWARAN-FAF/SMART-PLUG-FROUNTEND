import { useState, useEffect } from 'react';
import axios from 'axios';

  const channelId = localStorage.getItem('ts_channel_id') || '3325660';
  const readApiKey = localStorage.getItem('ts_read_key') || 'YTW9OE3XCWDSG0WZ';
  const THINGSPEAK_URL = `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${readApiKey}&results=50`;

export const useThingSpeak = () => {
  const [data, setData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(THINGSPEAK_URL);
      const feeds = response.data.feeds;
      
      if (feeds && feeds.length > 0) {
        const formattedData = feeds.map(feed => ({
          created_at: new Date(feed.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          originalTime: feed.created_at,
          voltage: parseFloat(feed.field1) || 0,
          current: parseFloat(feed.field2) || 0,
          power: parseFloat(feed.field3) || 0,
          energy: parseFloat(feed.field4) || 0,
          frequency: parseFloat(feed.field5) || 0,
          pf: parseFloat(feed.field6) || 0,
          temperature: parseFloat(feed.field7) || 0,
        }));

        setData(formattedData);
        setLatestData(formattedData[formattedData.length - 1]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching ThingSpeak data:', err);
      setError('Failed to fetch data from ThingSpeak');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Fetch data every 15 seconds
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return { data, latestData, loading, error, refetch: fetchData };
};

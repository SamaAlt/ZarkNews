import { useEffect, useState } from 'react';
import ProfileButton from '../../ProfileButton';
import Sidebar from '../../Sidebar/Sidebar';

const SubscriptionsAnalytics = () => {
  const [sectionCounts, setSectionCounts] = useState({});
  const [tagCounts, setTagCounts] = useState({});
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch section counts
        const sectionResponse = await fetch('/api/subscriptions/sections/count');
        if (!sectionResponse.ok) throw new Error('Failed to fetch section counts');
        const sectionData = await sectionResponse.json();
        setSectionCounts(sectionData);

        // Fetch tag counts
        const tagResponse = await fetch('/api/subscriptions/tags/count');
        if (!tagResponse.ok) throw new Error('Failed to fetch tag counts');
        const tagData = await tagResponse.json();
        setTagCounts(tagData);

        // Fetch total subscribers
        const totalResponse = await fetch('/api/subscriptions/count');
        if (!totalResponse.ok) throw new Error('Failed to fetch total subscribers');
        const totalData = await totalResponse.json();
        setTotalSubscribers(totalData.total_subscribers);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <nav>
        <ProfileButton />
      </nav>
      <Sidebar />
      <h1>Reader Subscriptions Analytics</h1>

      <section>
        <h2>Subscribers by Section</h2>
        <ul>
          {Object.entries(sectionCounts).map(([section, count]) => (
            <li key={section}>
              {section}: {count} subscribers
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Subscribers by Tag</h2>
        <ul>
          {Object.entries(tagCounts).map(([tag, count]) => (
            <li key={tag}>
              {tag}: {count} subscribers
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Total Subscribers</h2>
        <p>{totalSubscribers} subscribers</p>
      </section>
    </div>
  );
};

export default SubscriptionsAnalytics;
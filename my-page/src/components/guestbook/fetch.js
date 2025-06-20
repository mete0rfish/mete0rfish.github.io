const fetchLatestIssue = async () => {
    const res = await fetch('../../sign-data.json');
    const data = await res.json();
    return data;
};

export default fetchLatestIssue;

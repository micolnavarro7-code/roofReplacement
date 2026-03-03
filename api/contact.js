export default async function handler(req, res) {
    if (req.method \!== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const data = req.body;

        if (\!data.FirstName || \!data.LastName || \!data.Phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const formBody = new URLSearchParams();
        formBody.append('FirstName', data.FirstName);
        formBody.append('LastName', data.LastName);
        formBody.append('Phone', data.Phone);
        if (data.Street) formBody.append('Street', data.Street);
        if (data.City) formBody.append('City', data.City);
        if (data.Zip) formBody.append('Zip', data.Zip);
        if (data.State) formBody.append('State', data.State);
        if (data.Message) formBody.append('Note', data.Message);

        const acculynxResponse = await fetch(
            'https://leads.acculynx.com/api/leads/submit-new-lead?formID=baf9f419-1a06-46ed-96b8-30c69263a592',
            {
                method: 'POST',
                body: formBody,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return res.status(200).json({
            success: true,
            status: acculynxResponse.status,
            message: 'Lead submitted successfully',
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const handleAlert = async (req, res) => {
    const { lat, lng, clipId } = req.body;

    // Optional: Save to DB

    // Emit to frontend via socket
    req.io.emit('new-alert', {
        id: Date.now(),
        lat,
        lng,
        clipId,
        time: new Date()
    });

    res.status(200).json({ message: 'Alert sent to dashboard' });
};

module.exports = { handleAlert }
import express from 'express';
import { sendBookingEmailAlert } from './email';

const router = express.Router();

// Example booking endpoint
router.post('/book', async (req, res) => {
  const { name, email, details } = req.body;
  // Here you would save the booking to your database

  // Send email alert
  try {
    await sendBookingEmailAlert({
      to: 'erazishfak@gmail.com',
      subject: 'New Booking Received',
      text: `Booking from ${name} (${email}):\n${details}`,
    });
    res.status(200).json({ message: 'Booking successful and email sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Booking saved, but failed to send email.' });
  }
});

export default router;

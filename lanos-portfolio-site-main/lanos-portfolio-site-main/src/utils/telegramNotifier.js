/**
 * Utility function to send form submissions to a Telegram bot
 */

const formatTelegramMessage = (formData) => {
  const { formType, ...data } = formData;
  let message = `🔔 New ${formType} Submission\n\n`;

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      message += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value.join(', ')}\n`;
    } else {
      message += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
    }
  });

  return message;
};

const sendToTelegram = async (botToken, chatId, formData) => {
  try {
    // Validate inputs
    if (!botToken || !chatId) {
      throw new Error('Bot token or Chat ID is missing');
    }

    if (!formData || typeof formData !== 'object') {
      throw new Error('Invalid form data provided');
    }

    // Format the message
    const message = formatTelegramMessage(formData);
    
    // Telegram Bot API URL
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Send the message
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Telegram API Error: ${errorData.description || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (!data.ok) {
      throw new Error(`Telegram API Error: ${data.description}`);
    }

    return {
      success: true,
      messageId: data.result.message_id,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    throw error;
  }
};

export { sendToTelegram }; 
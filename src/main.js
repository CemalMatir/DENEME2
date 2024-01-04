export default async function run(data) {
    let response = await fetch(`http://185.92.3.198:5000/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "api",
            password: "api",
        }),
    });

    response = await response.json();

    let token = response.access_token;

    // Function to send a message with a delay
    const sendMessageWithDelay = async (item) => {
        let cleanedNumber = item?.phone_number?.toString().replace(/\s/g,"")
        if (cleanedNumber.startsWith("02") || cleanedNumber.startsWith("902")) { return }
        if (cleanedNumber.startsWith("5")) {
            cleanedNumber = "90" + cleanedNumber;

        }
        else if (cleanedNumber.startsWith("05")) {
            cleanedNumber = "9" + cleanedNumber;

        }

        console.log(cleanedNumber)
        await fetch(`http://185.92.3.198:5000/api/message/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                selectedPhone: cleanedNumber,
                message: ` ${item.name} ${item.surname} ${item.message}`,
            }),
        });
    };

    // Loop through data and send messages with a delay
    for (const item of data) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1000 milliseconds delay
        await sendMessageWithDelay(item);
    }
}

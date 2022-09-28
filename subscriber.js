const amqp = require("amqplib/callback_api");

amqp.connect('amqp://localhost',(err,connection)=>{
    if(err) {
        throw err;
    }
    connection.createChannel((err,channel)=>{
        if(err){
            throw err
        }
        let queueName = "Logical";
        channel.assertQueue(queueName,{
            durable:false
        });
        channel.consume(queueName,(msg)=>{
            console.log(`Recieve :- ${msg.content.toString()}`);
            channel.ack(msg)
        },{
            noAck: true
        })
    })
})
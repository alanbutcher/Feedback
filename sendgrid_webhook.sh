  
function localtunnel {
  lt --subdomain kjhjhghgjgfdcgfcfff --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done

# "webhook": "ssh -R FeedbackApp2019:80:localhost:5000 serveo.net" ***package.json
# https://FeedbackApp2019.serveo.net/api/surveys/webhooks ***sendgrid link

# function localtunnel {
#   lt -s FeedBackAppalanb --port 5000
# }
# until localtunnel; do
# echo "localtunnel server crashed"
# sleep 2
# done

# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/contacts' do
  Contact.all.to_json
end

post '/api/contacts' do
  # binding.pry
  new_contact = Contact.new(first_name: params["first_name"], last_name: params["last_name"], email: params["email"])
  if new_contact.save
    new_contact.to_json
  else
    {error_message: "Something went wrong."}.to_json
  end
end
print "Enter current temp (c): "
current_temp = gets.to_f

print "Is the AC working? (y/n): "
ac_working = gets.chomp.downcase

print "Enter desired temp (c):"
desired_temp = gets.to_f

p current_temp, ac_working, desired_temp

if ac_working == "y" v
  puts "AC working!"
  if current_temp > desired_temp
    puts "Turn on A/C Please"
  end
else
  puts "AC not working"
end

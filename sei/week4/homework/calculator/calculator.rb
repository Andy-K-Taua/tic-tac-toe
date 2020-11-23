def values
  [gets, gets].map{ |s| s.chomp.to_i }
end

puts "Pick and operation (+,-,*,/,^,)"
response = gets.chomp

case response.downcase
when "+"
  puts "which numbers would you like to add?"
  operator = :+
end

case response.downcase
when "-"
  puts "which numbers would you like to minus?"
  operator = :-
end

case response.downcase
when "*"
  puts "which numbers would you like to times?"
  operator = :*
end

case response.downcase
when "/"
  puts "which numbers would you like to divide?"
  operator = :/
end

case response.downcase
when "^"
  puts "which numbers would you like to the power of?"
  operator = :^
end


answer = values.inject(operator)
puts "The answer is... #{ answer }"

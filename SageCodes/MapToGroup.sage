# coding: latin-1

import hashlib
import warnings

def map_to_group ( self , m , n , msg , r ) :

	F = self.base_field()
	p = F.characteristic()

	if(not self.a1==0 and self.a3==0):
	        warnings.warn("map to group : elliptic curve over field of char. p!=2 is not on form y *2")
	
	nn = F.cardinality()
	
	#check that base field is not to large
	
	if nn.nbits( ) > 159 :
		 warnings.warn("map to group : base field is to large")
	
	#character translation from hex to binary form 
	convert = {
	
	'0' : '0000',
	'1' : '0001' ,
	'2' : '0010' ,
	'3' : '0011' ,
	'4' : '0100' ,
	'5' : '0101' ,
	'6' : '0110' ,
	'7' : '0111' ,
	'8' : '1000' ,
	'9' : '1001' ,
	'a' : '1010' ,
	'b' : '1011' ,
	'c' : '1100' ,
	'd' : '1101' ,
	'e' : '1110' ,
	'f' : '1111' 

	}

	i=0
	s=r.nbits()

	while i<=s :
		# First we hash the message plus a bit i :
		msg_hash_hex_str = hashlib.sha1(str(i) + msg).hexdigest()
		msg_hash_bit_str = ''
		for hexletter in msg_hash_hex_str :
			msg_hash_bit_str += convert [hexletter]
		
		t= int(msg_hash_bit_str[:-1] , 2 )%nn
		
		# coerce x into an field element by coercing into ←-coefficients
		
		x = sum([F.gen()**k*c for k, c in enumerate(t.digits(F.characteristic()))])
		
		#use last bit for random bit b
		
		b = Integer(msg_hash_bit_str[159])
		f = x**3 + self.a2()*x**2 + self.a4()*x + self.a6()
		
		if f.is_square():
			square_roots=f.sqrt(all=True)
			
			PMT=self ( x , square_roots[ b ] )
			
			PM = Integer (m/n) * PMT
			if PM != self(0) :
				return PM
		i = i+1 
	warnings.warn("map to group to group unsuccessful")
	

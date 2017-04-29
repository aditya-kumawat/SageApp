# coding: latin-1

from sage.categories.homset import Hom
from sage.structure.sage_object import save, load
import sage.rings.all as rings

class BLSSignatureScheme():
	r
	def __init__(self, g1, g2, m, n):
		r
		self.g1 = g1 
		self.gx2 = g2
		self.prime_order = n
		self.E_cardinality = m

		self.E = self.g1.curve()
		self.F = self.E.base_field()
		self.Ex = self.gx2.curve()
		self.Fx = self.Ex.base_field()

		if self.F.order().is_prime():
			self.phi = Hom(self.F, self.Fx)(self.F.gen())
		else: 
			self.phi = Hom(self.F, self.Fx)(self.F.gen().minpoly().roots(self.Fx)[0][0])
		self.gx1 = self.Ex(self.phi(self.g1.xy()[0]), self.phi(self.g1.xy()[1]))
		self.prime_field = rings.FiniteField(n)
		self.map_to_group_stop_parameter = rings.Integer(17)
		self.public_key = None
		self.private_key = None
		self.signature = None
		self.point_hash = None
	def public_key(self):
		return self.public_key
	def private_key(self):
		return self.private_key
	def signature(self):
		return self.signature
	def point_hash(self):
		return self.point_hash
	
	def generate_key_pair(self):
		r
		_x = self.prime_field(0)
		while _x == 0 or _x == 1:
			_x = self.prime_field.random_element()
		self.generated_private_key = _x
		self.generated_public_key = int(_x)*self.gx2
		self.reset_key_pair()
	def sign(self, msg, priv):
		r
		if priv == None:
			raise Warning, "haha"
		self.point_hash = map_to_group(self.E, self.E_cardinality, self.prime_order, msg, self.map_to_group_stop_parameter)
		_sigma = rings.Integer(priv)*self.point_hash
		self.signature = _sigma.xy()[0]
		return self.signature

	def validate(self, msg, sig, pub):
		r
		sign = self.phi(sig)
		if self.Ex.is_x_coord(sign):
			_sigma = self.Ex.lift_x(sign)
			if self.prime_order*_sigma == self.Ex(0):
				msg2 = msg 
				_R1 = map_to_group(self.E, self.E_cardinality, self.prime_order, msg, self.map_to_group_stop_parameter)
				_R2 = self.Ex(self.phi(_R1.xy()[0]), self.phi(_R1.xy()[1]))
				_e1 = _sigma.weil_pairing(self.gx2, self.prime_order)
				_e2 = _R2.weil_pairing(pub, self.prime_order)
				if _e1 == _e2 or _e1**(-1)==_e2:
					return True
				else:
					return False
		else:
			return False

	def reset_key_pair(self):
		r
		self.public_key = self.generated_public_key
		self.private_key = self.generated_private_key


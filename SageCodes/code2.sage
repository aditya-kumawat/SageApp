# coding: latin-1

load('SageCodes/MapToGroup.sage')
load('SageCodes/exp4.sage')
q =625852803282871856053922297323874661378036491717
r =208617601094290618684641029477488665211553761021
B =423976005090848776334332509669574781621802740510
m =625852803282871856053923088432465995634661283063
m2 =60094290356408407130984161127310078516360031868417968262992864809623507269833854678414046779817844853757026858774966331434198257512457993293271849043664655146443229029069463392046837830267994222789160047337432075266619082657640364986415435746294498140589844832666082434658532589211525696
F1 = FiniteField(q)
k = 6
t = cputime()
F2 = FiniteField(q^k, 'b')
E1 = EllipticCurve(F1,[0,0,0,-3,B])
E2 = EllipticCurve(F2,[0,0,0,-3,B])
n=r
P1 = int(m/n)*E1.random_point()
if n*P1!= E1(0):
	print "P not generated"
phi = Hom(F1, F2)(F1.gen())
P2 = E2(P1)
Q = int(m2/(n**2))*E2.random_point()
BLS = BLSSignatureScheme(P1, Q, m, n)
BLS.generate_key_pair()
pub = BLS.public_key
priv = BLS.private_key
msg = sys.argv[1]
sig = BLS.sign(msg, priv)
BLS.signature in F1

BLS.generate_key_pair()
pub1 = BLS.public_key
priv1 = BLS.private_key
sig1 = BLS.sign(msg, priv1)
ans = BLS.validate(msg, sig, pub1)
print ans
print sig
print sig1
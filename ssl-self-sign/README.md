https://www.akadia.com/services/ssh_test_certificate.html

PS C:\source\burtonrodman\azure-devops-environment-status\ssl-self-sign> & "C:\Program Files\Git\usr\bin\openssl.exe" genrsa -des3 -out server.key 1024
Generating RSA private key, 1024 bit long modulus (2 primes)
....................+++++
......+++++
e is 65537 (0x010001)
Enter pass phrase for server.key:
Verifying - Enter pass phrase for server.key:
PS C:\source\burtonrodman\azure-devops-environment-status\ssl-self-sign> & "C:\Program Files\Git\usr\bin\openssl.exe" req -new -key server.key -out server.csr
Enter pass phrase for server.key:
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:US
State or Province Name (full name) [Some-State]:Florida
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:BurtonRodman
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:Burton Rodman
Email Address []:burtonrodman@hotmail.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:
An optional company name []:
PS C:\source\burtonrodman\azure-devops-environment-status\ssl-self-sign> & "C:\Program Files\Git\usr\bin\openssl.exe" x509 -req -days 365 -in .\server.csr -signkey .\server.key -out server.crt
Signature ok
subject=C = US, ST = Florida, O = BurtonRodman, CN = Burton Rodman, emailAddress = burtonrodman@hotmail.com
Getting Private key
Enter pass phrase for .\server.key:
PS C:\source\burtonrodman\azure-devops-environment-status\ssl-self-sign> dir

    Directory: C:\source\burtonrodman\azure-devops-environment-status\ssl-self-sign

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           6/25/2022 11:12 PM            908 server.crt
-a---           6/25/2022 11:10 PM            672 server.csr
-a---           6/25/2022 11:09 PM            963 server.key

PS C:\source\burtonrodman\azure-devops-environment-status\ssl-self-sign>
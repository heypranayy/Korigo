import os
import sqlite3
import shutil
import tempfile

cookie_db = os.path.expanduser(r'~\AppData\Local\Google\Chrome\User Data\Default\Network\Cookies')
if not os.path.exists(cookie_db):
    print("Cookie DB does not exist at:", cookie_db)
else:
    print("Found Cookie DB:", cookie_db)
    # Copy to temp because Chrome has lock
    with tempfile.NamedTemporaryFile(delete=False) as tf:
        temp_db = tf.name
    shutil.copy2(cookie_db, temp_db)
    
    conn = sqlite3.connect(temp_db)
    cursor = conn.cursor()
    cursor.execute("SELECT host_key, name, path FROM cookies WHERE host_key LIKE '%sampledomain%'")
    rows = cursor.fetchall()
    print("Cookies found for sampledomain:", rows)
    conn.close()
    os.remove(temp_db)

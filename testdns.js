import dns from "dns";

dns.setServers(["8.8.8.8"]);

dns.resolveSrv(
  "_mongodb._tcp.cluster-backend.xw48k4r.mongodb.net",
  (err, records) => {
    if (err) {
      console.error("ERROR:", err);
    } else {
      console.log("SUCCESS:", records);
    }
  }
);
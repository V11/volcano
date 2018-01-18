/**
 * Created by kurpav on 6/11/15.
 */
module.exports.parse = function (data) {
    var ports = [],
        port = null;
    for(var i = 0, len = data.nmaprun.host[0].ports[0].port.length; i < len; i++) {
        port = data.nmaprun.host[0].ports[0].port[i];
        ports.push({
            protocol: port.$.protocol,
            portid: port.$.portid,
            state: port.state[0].$.state,
            service: port.service[0].$.name
        });
    }

    return {
        version: data.nmaprun.$.version,
        command: data.nmaprun.$.args,
        startDate: data.nmaprun.$.startstr,
        hostname: data.nmaprun.host[0].hostnames[0].hostname[0].$.name,
        address: data.nmaprun.host[0].address[0].$.addr,
        ports: ports
    };
};

module.exports.getReport = function(data) {
    var str = 'Opened ports:\n',
        port = null;

    for(var i = 0, len = data.ports.length; i < len; i++) {
        port = data.ports[i];
        str += port.service + ' ' + port.portid + ' ' + port.state + '\n';
    }

    return str;
};
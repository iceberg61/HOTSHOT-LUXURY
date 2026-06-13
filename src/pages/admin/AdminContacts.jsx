import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import useAuthStore from '../../store/authStore'
import API_URL from '../../api/config'

function AdminContacts() {
  const { user } = useAuthStore()
  const [contacts, setContacts] = useState([])
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('contacts')

  useEffect(() => {
    const load = async () => {
      try {
        const [contactsRes, subscribersRes] = await Promise.all([
          fetch(`${API_URL}/api/contact`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          fetch(`${API_URL}/api/contact/newsletter`, {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ])
        const contactsData = await contactsRes.json()
        const subscribersData = await subscribersRes.json()
        setContacts(contactsData)
        setSubscribers(subscribersData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">

        <div>
          <h1 className="text-white text-xl sm:text-2xl font-black uppercase tracking-wider">
            Contacts & Subscribers
          </h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">
            {contacts.length} messages · {subscribers.length} subscribers
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {['contacts', 'subscribers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-xs tracking-widest uppercase border transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
              }`}
            >
              {tab === 'contacts' ? `Messages (${contacts.length})` : `Subscribers (${subscribers.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Contacts */}
            {activeTab === 'contacts' && (
              <div className="flex flex-col gap-3">
                {contacts.length === 0 ? (
                  <p className="text-zinc-600 text-xs tracking-widest uppercase text-center py-20">
                    No messages yet
                  </p>
                ) : (
                  contacts.map((contact) => (
                    <ContactCard key={contact._id} contact={contact} />
                  ))
                )}
              </div>
            )}

            {/* Subscribers */}
            {activeTab === 'subscribers' && (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block bg-black border border-zinc-800 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">#</th>
                        <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Email</th>
                        <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Subscribed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-20 text-center text-zinc-600 text-xs tracking-widest uppercase">
                            No subscribers yet
                          </td>
                        </tr>
                      ) : (
                        subscribers.map((sub, i) => (
                          <tr key={sub._id} className="border-b border-zinc-900 hover:bg-zinc-950 transition-colors">
                            <td className="px-6 py-4 text-zinc-600 text-xs">{i + 1}</td>
                            <td className="px-6 py-4 text-white text-xs font-bold">{sub.email}</td>
                            <td className="px-6 py-4 text-zinc-400 text-xs">
                              {new Date(sub.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden flex flex-col gap-3">
                  {subscribers.map((sub, i) => (
                    <div key={sub._id} className="bg-black border border-zinc-800 px-4 py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-zinc-600 text-xs shrink-0">{i + 1}</span>
                        <p className="text-white text-xs font-bold truncate">{sub.email}</p>
                      </div>
                      <p className="text-zinc-500 text-xs shrink-0">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  )
}

function ContactCard({ contact }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-black border border-zinc-800">
      <div
        className="px-4 sm:px-6 py-4 cursor-pointer hover:bg-zinc-950 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-white text-xs font-bold tracking-wider">
                {contact.firstName} {contact.lastName}
              </p>
              <p className="text-zinc-500 text-xs truncate">{contact.email}</p>
            </div>
            <p className="text-zinc-600 text-xs mt-1 truncate">{contact.message}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <p className="text-zinc-600 text-xs hidden sm:block">
              {new Date(contact.createdAt).toLocaleDateString()}
            </p>
            <span className="text-zinc-600 text-xs">{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-zinc-800 px-4 sm:px-6 py-6 bg-zinc-950">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Name</p>
                <p className="text-white text-xs">{contact.firstName} {contact.lastName}</p>
              </div>
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Email</p>
                <a href={`mailto:${contact.email}`} className="text-red-500 text-xs hover:text-white transition-colors">
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div>
                  <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Phone</p>
                  <p className="text-white text-xs">{contact.phone}</p>
                </div>
              )}
              <div>
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Date</p>
                <p className="text-zinc-400 text-xs">
                  {new Date(contact.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <div>
              <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">Message</p>
              <div className="bg-zinc-900 border border-zinc-800 p-4">
                <p className="text-zinc-300 text-xs leading-relaxed">{contact.message}</p>
              </div>
              <a
                href={`mailto:${contact.email}?subject=Re: Your message to Hotshot Luxury`}
                className="inline-block mt-3 bg-red-500 text-white text-xs tracking-[0.3em] uppercase px-6 py-3 hover:bg-red-600 transition-all duration-300"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminContacts
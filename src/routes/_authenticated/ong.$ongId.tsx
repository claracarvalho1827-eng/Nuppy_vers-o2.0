const { data: ong } = useSuspenseQuery({
  queryKey: ["ong", ongId],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("ongs").select("*").eq("id", ongId).single();
    if (error) throw error;
    return data;
  },
});

// PIX: navigator.clipboard.writeText(ong.pix)
// Telefone: <a href={`tel:${ong.phone}`}>
// Site: <a href={ong.website} target="_blank" rel="noopener noreferrer">
// Rota: <a href={`https://www.google.com/maps?q=${ong.latitude},${ong.longitude}`} target="_blank">Ver no mapa</a>